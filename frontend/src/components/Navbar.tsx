/** @jsxImportSource @emotion/react */

import Container from "./Container";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import { useDispatch } from "react-redux";
import { openUploadModal } from "../uploadModal/actions";


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [atctiveTab, setActiveTab] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);

  // const navbarItems = ["Home", "My Songs", "My favorites", "About"];
  const navbarItems: string[] = [];
  
  const dispatch = useDispatch();
  // const isOpen = useSelector((state: any) => state.uploadModalReducer.isOpen);

  // const handleMenuItemClick = useCallback((item :string) => {
  //   setActiveTab(item);
  // }, []);
  

  return (
    <Container>
      <div
        css={{
          backgroundColor: "white",
          fontSize: "1.5rem",
          height: "3rem",
          width: "100%",
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "3rem 10rem",
          "@media (max-width: 890px)": {
            padding: "2.5rem 3rem",
          },
          "@media (max-width: 500px)": {
            padding: "2rem 1rem",
          },
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <div
          css={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            justifyContent: "flex-start",
          }}
        >
          <div
            css={{
              display: "flex",
              alignItems: "center",
              gap: ".8rem",
              justifyContent: "flex-start",
            }}
          >
            <div
              css={{
                position: "relative",
              }}
            >
              <FiMenu
                onClick={() => setShowMenu(!showMenu)}
                size={30}
                css={{
                  display: "none",
                  "@media (max-width: 1170px)": {
                    display: "block",
                  },
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              />
              <div
                css={{
                  backgroundColor: "white",
                  position: "absolute",
                  top: "2.5rem",
                  left: "0",
                  display: showMenu ? "flex" : "none",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: ".5rem",
                  padding: "1rem 0",
                  borderRadius: "1rem",
                  boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                  fontSize: "1.2rem",
                  minWidth: "12rem",
                }}
              >
                {/* {navbarItems.map((item, i) => (
                  <div
                  key={i}
                    onClick={() => handleMenuItemClick(item)}
                    css={{
                      padding: ".2rem 1rem",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <div
                      css={{
                        fontWeight: atctiveTab === item ? "bold" : "lighter",
                        ":hover": {
                          cursor: "pointer",
                          fontWeight: atctiveTab === item ? "bold" : "normal",
                        },
                      }}
                    >
                      {item}
                    </div>
                  </div>
                ))} */}
                <div
                  css={{
                    padding: "0 1rem",
                    width: "100%",
                    color: "white",
                    textAlign: "left",
                    fontWeight: "lighter",
                    ":hover": {
                      cursor: "pointer",
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => dispatch(openUploadModal())}
                    css={{
                      border: "none",
                      ":focus": {
                        outline: "none",
                      },
                      color: "white",
                      fontWeight: "bold",
                      padding: "1rem 2rem",
                      backgroundColor: "red",
                      borderRadius: "1rem",
                      ":hover": {
                        scale: "1.1",
                        cursor: "pointer",
                      },
                      transition: "scale 0.2s",
                    }}
                  >
                    Upload Music
                  </button>
                </div>
              </div>
            </div>
            <div
              css={{
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1.7rem",
              }}
            >
              Music
              <span
                css={{
                  color: "red",
                }}
              >
                HALL
              </span>
            </div>
          </div>
          <div
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.6rem",
              "@media (max-width: 1270px)": {
                display: "none",
              },
            }}
          >
            {navbarItems.map((item, i) => (
              <div
                onClick={() => setActiveTab(item)}
                key={i}
                css={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "center",
                  ":hover": {
                    cursor: "pointer",
                  },
                  ":hover :last-child": {
                    width: "80%",
                    backgroundColor: "red",
                  },
                }}
              >
                <div
                  css={{
                    fontSize: "1rem",
                    fontWeight: atctiveTab === item ? "bold" : "lighter",
                  }}
                >
                  {item}
                </div>
                <div
                  css={{
                    height: "3px",
                    borderRadius: "4rem",
                    width: atctiveTab === item ? "80%" : "0%",
                    backgroundColor: "red",
                    transition: "width 0.2s",
                  }}
                ></div>
              </div>
            ))}
          </div>

          <div
            css={{
              position: "relative",
              "@media (max-width: 1170px)": {
                display: "none",
              },
            }}
          >
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              css={{
                border: "none",
                paddingLeft: ".9rem",
                paddingRight: "2.5rem",
                borderRadius: "1rem",
                backgroundColor: "#f2e9e1",
                height: "2.5rem",
                width: searchTerm === "" ? "18rem" : "25rem",
                transition: "width 0.5s",
                fontSize: "1rem",
                ":hover": {
                  cursor: "pointer",
                  width: "25rem",
                },
                ":focus": {
                  border: "1px solid grey",
                  outline: "none",
                  width: "25rem",
                },
              }}
              type="text"
              placeholder="Search music"
            />
            <div>
              <FaSearch
                color="grey"
                css={{
                  position: "absolute",
                  top: ".7rem",
                  right: "1rem",
                  fontSize: "1.2rem",
                }}
              />
            </div>
          </div>
        </div>
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".4rem",
            '@media (max-width: 650px)': {
              display: "none",
            }
          }}
        >
          <button
            onClick={() => dispatch(openUploadModal())}
            css={{
              border: "none",
              backgroundColor: "red",
              color: "white",
              padding: ".5rem 1.8rem",
              borderRadius: "5rem",
              fontWeight: "bold",
              fontSize: "1rem",
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            Upload music
          </button>
          {/* <button
            css={{
              border: "none",
              backgroundColor: "white",
              color: "black",
              padding: ".5rem 1rem",
              borderRadius: ".3rem",
              fontWeight: "bold",
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            Sign Up
          </button> */}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
