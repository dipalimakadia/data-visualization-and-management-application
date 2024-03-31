import React from "react";
import { Linkedin, Github, Link} from "react-bootstrap-icons";
const Footer = () => {
  const links = [
    {
      id: 1,
      child: (
        <>
          <Linkedin size={30} />
        </>
      ),
      href: "https://www.linkedin.com/in/dipali-makadia/",
      style: "",
    },
    {
      id: 2,
      child: (
        <>
         <Github size={30} />
        </>
      ),
      href: "https://github.com/dipalimakadia",
    },
    {
        id: 3,
        child: (
          <>
           <Link size={30} />
          </>
        ),
        href: "https://dipalimakadia.github.io/Dipali-s-Portfolio",
      },
  ];

  return (
    <div className="container-fluid footer m-0 bg-pureBlack">
      <footer className="d-flex row justify-content-between align-items-center py-3">
        <div className=" col-sm-3 d-flex align-items-center">
          <span className="mb-3 ml-3 mb-md-0">© 2024 Dipali Makadia</span>
        </div>
        <div className=" col-sm-4 d-flex float-right">
          <ul className="">
            {links.map(({ id, child, href }) => (
              <li
                key={id}
                className=""
              >
                <a
                  href={href}
                  className="url_link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {child}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
