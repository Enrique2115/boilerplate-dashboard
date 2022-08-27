import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import UnAuthPageComponent from "src/components/unauthorized";

function UnAuthPage({ children }) {
  const { authInfo } = useSelector((state) => state.auth);
  const router = useRouter();

  let role = authInfo?.role;

  let allowed = true;

  if (router.pathname.startsWith("/employee") && role !== "employee") {
    if (role) {
      allowed = false;
    }
  }
  if (router.pathname.startsWith("/admin") && role !== "admin") {
    if (role) {
      allowed = false;
    }
  }

  useEffect(() => {
    if (router.pathname.startsWith("/employee") && role !== "employee") {
      if (role) {
        // console.log("redirect to employee");
        router.push(`/${role}`);
      }
    }

    if (router.pathname.startsWith("/admin") && role !== "admin") {
      if (role) {
        // console.log("redirect to admin");
        router.push(`/${role}`);
      }
    }
  }, [authInfo, router, role]);

  const ComponentToRender = allowed ? children : <UnAuthPageComponent />;
  return ComponentToRender;
}

export { UnAuthPage };
