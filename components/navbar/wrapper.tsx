import { auth } from "@/auth";

import Navbar from ".";

const NavbarWrapper = async () => {
  const session = await auth();
  return <Navbar session={session} />;
};

export { NavbarWrapper };
