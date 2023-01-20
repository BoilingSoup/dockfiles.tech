import dynamic from "next/dynamic";
import React, { ReactElement } from "react";

type Props = {
  children: ReactElement;
};

const NoSsr = (props: Props) => <React.Fragment>{props.children}</React.Fragment>;

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
