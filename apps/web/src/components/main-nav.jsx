import React, { useRef, useState } from "react";

import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { useMediaQuery } from "@uidotdev/usehooks";
import { cls } from "@/utils/cls";

import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { Link, NavLink } from "react-router";
import SiteLogo from "./site-logo";

import { FaShoppingCart } from "react-icons/fa";
import { Popover } from "@mui/material";
import { useSession } from "@/modules/session/useSession";
import { useCartItemsQuery } from "@/lib/api/cart";

function MainNav({ className }) {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 993px) and (max-width : 1200px)"
  );
  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1201px)"
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const menuId = "main-menu";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnchorElRef = useRef();

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const showSmallMenu = isSmallDevice || isMediumDevice;
  // const showSmallMenu = false;
  const showLargeMenu = !showSmallMenu;

  const session = useSession();
  const currentProfile = session.getCurrentProfile();

  const {
    isLoading,
    isError,
    isSuccess,
    data: cartItems,
    refetch: refetchCartItems,
  } = useCartItemsQuery(currentProfile?._id, {
    enabled: session.isLoggedIn,
  });

  const items = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "Lessons",
      path: "/lessons",
    },
    {
      name: "Task",
      path: "/Task",
    },
    {
      name: "Events",
      path: "/events",
    },
  ];

  const smallMenuItems = [...items];

  if (session.isLoggedIn) {
    smallMenuItems.push(
      {
        name: `Cart ${isSuccess ? `(${cartItems.length})` : ""}`,
        path: "/cart",
      },
      {
        name: "Profile",
        path: "/profiles/me",
      },
      {
        name: "Settings",
        path: "/settings",
      },
      {
        name: "Log out",
        path: "/logout",
      }
    );
  }

  if (!session.isLoggedIn) {
    smallMenuItems.push(
      {
        name: "Log In",
        path: "/login",
      },
      {
        name: "Sign Up",
        path: "/signup",
      }
    );
  }

  const largeMenuItems = [...items];

  return (
    <nav
      className={cls(
        "flex flex-col border-b lg:border lg:rounded-md lg:mt-2 lg:mx-4",
        className
      )}
    >
      <div
        className={cls(
          `
            flex items-center justify-between
            w-full
            p-3
          `,
          showLargeMenu && "justify-start"
        )}
      >
        <SiteLogo />

        {showSmallMenu && (
          <button className="mr-2" onClick={handleToggleMenu}>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ option: 0, rotate: 90 }}
                layout
              >
                {!isOpen && <RxHamburgerMenu className="w-6 h-6" />}
                {isOpen && <RxCross1 className="w-6 h-6" />}
              </motion.div>
            </AnimatePresence>
          </button>
        )}

        {showLargeMenu && (
          <div className="w-full">
            <div className="ml-6">
              <div className="flex flex-row gap-3 items-center">
                {largeMenuItems.map((menuItem, index) => {
                  return (
                    <NavLink
                      key={`nav-item-main-${menuItem.path}`}
                      className={cls(
                        `
                          font-lato h-10 px-4 flex items-center justify-center cursor-pointer
                          hover:bg-neutral-100 hover:text-neutral-content-100
                          rounded-md transition-colors
                        `
                        // index === 0 && "bg-neutral-50 text-neutral-content-50"
                      )}
                      to={menuItem.path}
                    >
                      {menuItem.name}
                    </NavLink>
                  );
                })}

                <div className="ml-auto flex items-center justify-center gap-4">
                  {session.isLoggedIn && (
                    <NavLink
                      to={"/cart"}
                      className="w-12 h-12 rounded-full border flex items-center relative"
                    >
                      <FaShoppingCart className="ml-3" size={20} />
                      {session.isLoggedIn && isSuccess && (
                        <span className="absolute -bottom-1 -right-1 text-sm rounded-full p-1 bg-white">
                          {cartItems.length}
                        </span>
                      )}
                    </NavLink>
                  )}

                  {session.isLoggedIn && (
                    <button
                      aria-describedby={menuId}
                      onClick={handleOpenMenu}
                      className="w-12 h-12 bg-accent-400 border border-accent-300 text-lg text-accent-content-400 rounded-full flex items-center justify-center"
                      ref={menuAnchorElRef}
                    >
                      A
                    </button>
                  )}

                  {!session.isLoggedIn && (
                    <NavLink
                      className={cls(
                        "p-2 px-8 bg-primary-900 text-primary-content-900 font-bold"
                      )}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  )}

                  {session.isLoggedIn && (
                    <Popover
                      id={menuId}
                      open={isMenuOpen}
                      anchorEl={menuAnchorElRef.current}
                      onClose={handleCloseMenu}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <div
                        className="min-w-52 flex flex-col"
                        onClick={(e) => {
                          if (e.target.tagName === "A") {
                            handleCloseMenu();
                          }
                        }}
                      >
                        <NavLink
                          className="p-2 px-4 hover:bg-neutral-200"
                          to={`/profiles/${session.getCurrentProfile()._id}`}
                        >
                          Profile
                        </NavLink>
                        <NavLink
                          className="p-2 px-4 hover:bg-neutral-200"
                          to={"/settings"}
                        >
                          Settings
                        </NavLink>
                        <hr />
                        <NavLink
                          className="p-2 px-4 hover:bg-neutral-200"
                          to={"/logout"}
                        >
                          Logout
                        </NavLink>
                      </div>
                    </Popover>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* small screen menu */}
      <AnimatePresence>
        {showSmallMenu && isOpen && (
          <>
            <motion.div
              className="border-t w-full"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: "auto",
              }}
              exit={{
                height: 0,
              }}
              className="overflow-hidden"
              layout
            >
              <div className="flex flex-col">
                {smallMenuItems.map((menuItem, index) => {
                  return (
                    <NavLink
                      to={menuItem.path}
                      key={`nav-item-small-${menuItem.path}`}
                    >
                      <motion.div
                        className={cls(
                          `
                          p-4 font-lato border-b w-full cursor-pointer hover:bg-neutral-100 hover:text-neutral-content-100
                          transition-colors
                        `
                        )}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {menuItem.name}
                      </motion.div>
                    </NavLink>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default MainNav;
