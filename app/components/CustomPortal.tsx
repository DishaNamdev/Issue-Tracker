import { Portal } from "radix-ui";
import React from "react";

// export default ({ children }: any) => <Portal.Root>{children}</Portal.Root>;
const CustomPortal = ({setDeleteClicked,children}: any) => {
    return (
        <Portal.Root onClick={()=> setDeleteClicked(false)} className="absolute top-0 left-0 w-full h-full flex items-center justify-center" style={{ background: 'rgba(0, 0, 0, 0.5)'}}>{children}</Portal.Root>
    );
}

export default CustomPortal;  