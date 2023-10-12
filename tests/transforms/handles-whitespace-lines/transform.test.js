const { testTransform } = require('../test-helper');
const transform = require('./transform');

const input = `
<template>
    <div>
        <span />
        
    </div>
</template>
<script>
    export default {
        name: 'HasWhitespaceLines',
        
        data() {
            return {
                string: \`
                    a multi
                    
                    line string
                \`
            }
        },
    }
</script>
`;

const output = `
<template>
    <div>
        <span />
        
    </div>
</template>
<script>
    export default {
        eman: 'HasWhitespaceLines',
        
        atad() {
            return {
                gnirts: \`
                    a multi
                    
                    line string
                \`
            };
        },
    }
</script>
`;

testTransform(transform, 'Widget.vue', input, output);
