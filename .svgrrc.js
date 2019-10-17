function template({template}, opts, {imports, componentName, props, jsx, exports}) {
    const typeScriptTpl = template.smart({plugins: ["svgo", "typescript"]});
    return typeScriptTpl.ast`
     import React from "react";
     const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
     export default React.memo(${componentName});
`
}

module.exports = template;
