import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import logo from "../../assets/cinetik-logo.webp";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const navigation = [
  { name: "Discover", href: "/", current: true },
  { name: "Movies", href: "/movies", current: false },
  { name: "Series", href: "/series", current: false },
];

export function Navigation() {
  const location = useLocation();
  const disclosureButtonRef = useRef<HTMLButtonElement | null>(null);

  const navigationWithCurrent = navigation.map((item) => ({
    ...item,
    current: location.pathname === item.href,
  }));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        if (
          disclosureButtonRef.current &&
          document.body.style.overflow === "hidden"
        ) {
          disclosureButtonRef.current.click();
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative">
      <Disclosure
        as="nav"
        className="bg-white/10 backdrop-blur-lg border-b border-white/10 relative z-50"
      >
        {({ open }) => {
          useEffect(() => {
            if (open) {
              document.body.style.overflow = "hidden";
            } else {
              document.body.style.overflow = "";
            }

            return () => {
              document.body.style.overflow = "";
            };
          }, [open]);

          return (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between relative z-50">
                  <div className="flex items-center">
                    <div className="relative z-[100]">
                      <motion.div
                        className="shrink-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <a href="/">
                          <img
                            className="h-12 w-auto rounded-full"
                            src={logo}
                            alt="Cinetik Logo"
                          />
                        </a>
                      </motion.div>
                    </div>
                  </div>
                  <div className="hidden md:flex justify-center flex-1">
                    <div className="flex items-center space-x-4">
                      {navigationWithCurrent.map((item) => (
                        <motion.a
                          key={item.name}
                          href={item.href}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            item.current
                              ? "bg-white/10 text-white"
                              : "text-gray-300 hover:bg-white/5 hover:text-white",
                            "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6" />
                  </div>
                  <div className="-mr-2 flex md:hidden z-50">
                    <div className="relative z-[100]">
                      <Disclosure.Button
                        ref={disclosureButtonRef}
                        className="relative inline-flex items-center justify-center rounded-lg bg-white/5 p-2 text-gray-400 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              {open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed top-16 inset-x-0 h-[calc(100vh-4rem)] bg-black/50 z-60 md:hidden pointer-events-none"
                  aria-hidden="true"
                />
              )}

              <Disclosure.Panel className="fixed top-16 left-0 right-0 z-30 bg-gray-900 backdrop-blur-lg shadow-xl border-b border-white/10 md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1 px-2 pb-3 pt-2 sm:px-3"
                >
                  {navigationWithCurrent.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={cn(
                        item.current
                          ? "bg-white/10 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white",
                        "block rounded-lg px-3 py-2 text-base font-medium transition-all duration-200"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </motion.div>
              </Disclosure.Panel>
            </>
          );
        }}
      </Disclosure>
    </div>
  );
}
