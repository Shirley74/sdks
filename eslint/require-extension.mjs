export default {
    configs: {
        recommended: {
            rules: {
                'import/extensions': [
                    'error',
                    'ignorePackages',
                    {
                        'js': 'always',
                        'jsx': 'never',
                        'ts': 'never',
                        'tsx': 'never'
                    }
                ]
            }
        }
    }
};
