/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      css={css`
            width: 100%,
                @media (min-width: 768px) {
                    padding-left: 1rem;
                    padding-right: 1rem;
                },

            `}
    >
      {children}
    </div>
  );
};

export default Container;
