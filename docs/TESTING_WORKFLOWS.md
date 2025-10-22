# Testing GitHub Workflows for SDK Publishing

This guide explains how to test GitHub workflows before publishing SDKs to NPM.

## 🧪 Testing Methods

### 1. Test Workflow in GitHub (Recommended)

Use the dedicated test workflow without publishing:

```bash
# Through GitHub UI:
# Actions → Test Publish (Dry Run) → Run workflow
# Select SDK and keep "Dry run" checked

# The workflow will:
# - Build the SDK
# - Show what would be published
# - NOT actually publish anything
```

### 2. Local Testing with `act`

[act](https://github.com/nektos/act) runs GitHub Actions locally using Docker.

#### Installation
```bash
# macOS
brew install act

# Linux/Windows
# See: https://github.com/nektos/act#installation
```

#### Usage
```bash
# Test PR workflow
act pull_request

# Test specific workflow
act -W .github/workflows/pr-check.yml

# Test with specific event
act workflow_dispatch -W .github/workflows/test-publish.yml

# List all available workflows
act -l

# Dry run (show what would be executed)
act -n
```

#### Testing with Secrets
Create `.env.act` file (gitignored):
```env
GITHUB_TOKEN=your_github_token
NPM_AUTH_TOKEN=your_npm_token  # Use a test token if available
```

Then run:
```bash
act -s GITHUB_TOKEN=$GITHUB_TOKEN -s NPM_AUTH_TOKEN=$NPM_AUTH_TOKEN
```

### 3. Local Script Testing

Quick local validation without GitHub Actions:

```bash
# Make script executable
chmod +x scripts/test-publish-local.sh

# Test publishing for a specific SDK
./scripts/test-publish-local.sh aqua
./scripts/test-publish-local.sh fusion
./scripts/test-publish-local.sh cross-chain
./scripts/test-publish-local.sh limit-order

# Or use npm scripts
pnpm test:publish:aqua
pnpm test:publish:fusion
pnpm test:publish:cross-chain
pnpm test:publish:limit-order
```

### 4. Manual Testing Steps

#### Test Build Process:
```bash
# Build specific SDK
pnpm nx build aqua

# Check output structure
ls -la typescript/aqua/dist/

# Verify package.json is correct
cat typescript/aqua/dist/package.json
```

#### Test Pack (preview what npm publish will include):
```bash
cd typescript/aqua

# Dry run - shows what would be included
npm pack --dry-run

# Actually create tarball for inspection
npm pack
tar -tzf *.tgz | head -20  # List contents
rm *.tgz  # Clean up
```

#### Test Version Bump:
```bash
cd typescript/aqua

# Test version bump (without git commit)
npm version patch --no-git-tag-version
npm version minor --no-git-tag-version
npm version major --no-git-tag-version
npm version prerelease --preid=rc --no-git-tag-version

# Revert changes
git checkout -- package.json
```

#### Test Publishing (Dry Run):
```bash
cd typescript/aqua

# Build first
pnpm build

# Test what would be published
npm publish dist --dry-run

# Check registry without publishing
npm view @1inch/aqua-sdk  # See current published version
```

### 5. Local NPM Registry Testing (Advanced)

For complete end-to-end testing without affecting real NPM:

```bash
# Install verdaccio (local NPM registry)
npm install -g verdaccio

# Start local registry
verdaccio

# In another terminal, configure npm to use local registry
npm set registry http://localhost:4873/

# Create test user
npm adduser --registry http://localhost:4873/

# Test full publish flow locally
cd typescript/aqua
pnpm build
npm publish dist --registry http://localhost:4873/

# Verify it worked
npm view @1inch/aqua-sdk --registry http://localhost:4873/

# Install from local registry to test
cd /tmp
npm init -y
npm install @1inch/aqua-sdk --registry http://localhost:4873/

# Revert to normal registry when done
npm set registry https://registry.npmjs.org/
```

## 📋 Pre-Release Checklist

Before publishing a new SDK version:

- [ ] Run `pnpm lint` - No linting errors
- [ ] Run `pnpm test` - All tests pass
- [ ] Run `pnpm build` - Build succeeds
- [ ] Test with dry-run workflow in GitHub Actions
- [ ] Verify package contents with `npm pack --dry-run`
- [ ] Check version number is correct
- [ ] Verify changelog is up to date
- [ ] Review dependencies are production-ready

## 🚀 Release Process

Once testing is complete:

1. **Create Release:**
   - Go to Actions → "Release new version"
   - Select SDK and version bump type
   - Workflow creates tag and GitHub release

2. **Automatic Publishing:**
   - Tag creation triggers publish workflow
   - SDK is automatically published to NPM

3. **Verify Publication:**
   ```bash
   # Check NPM
   npm view @1inch/<sdk-name>
   
   # Test installation
   npm install @1inch/<sdk-name>@latest
   ```

## 🚨 Common Issues and Solutions

### Issue: act fails with Docker errors
**Solution**: Ensure Docker is running and you have sufficient resources allocated.

### Issue: Secrets not working in act
**Solution**: Create `.env.act` file with test tokens or use `-s` flag.

### Issue: Build outputs not found
**Solution**: Ensure you're running from repository root and dependencies are installed.

### Issue: npm pack shows unexpected files
**Solution**: Check `files` field in package.json and ensure `.npmignore` is configured correctly.

### Issue: Version conflicts
**Solution**: Always sync version between package.json and tags. Use the release workflow to manage versions.

## 🔍 Debugging Workflows

Add debug steps to workflows when needed:
```yaml
- name: Debug Info
  run: |
    echo "Current directory: $(pwd)"
    echo "Files in dist:"
    ls -la dist/
    echo "Package.json content:"
    cat package.json
    echo "NPM config:"
    npm config list
```

## 📚 Resources

- [act Documentation](https://github.com/nektos/act)
- [NPM Publish Documentation](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [NPM Dry Run](https://docs.npmjs.com/cli/v9/commands/npm-publish#dry-run)
- [Verdaccio Local Registry](https://verdaccio.org/docs/what-is-verdaccio)