import { useRouter } from "next/router";
import React from "react";
import SendEmail from "src/components/recoveryPassword/SendEmail";
import SendNewPassword from "src/components/recoveryPassword/SendNewPassword";

const RecoveryPassword = () => {
  const router = useRouter();

  if (router.query.token) {
    return <SendNewPassword token={router.query.token} />;
  }

  return <SendEmail />;
};

export default RecoveryPassword;
