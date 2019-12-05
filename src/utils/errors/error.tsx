import React from "react";

export const showError = (error: any) => {
  return (
    <div>
      {error.message}
    </div>
  );
};
