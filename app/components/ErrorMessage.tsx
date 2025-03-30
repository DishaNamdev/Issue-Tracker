import React,{ PropsWithChildren, ReactNode } from "react";
import { Text } from "@radix-ui/themes";

// interface Props {
// //   children: ReactNode;
// // }

const ErrorMessage: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <Text as="p" color="red">{children}</Text>
        );
};
  
export default ErrorMessage;