import React from "react";

export default function Footer() {

  return (
    <footer>
      <div className="footer">
        <div className="text-center">
          <h5>Eversion</h5>
        </div>
        <div className="icons">
          <i class="fa-brands fa-linkedin"></i>
          <i class="fa-brands fa-twitter"></i>
          <i class="fa-brands fa-facebook-f"></i>
          <i class="fa-brands fa-instagram"></i>
        </div>{" "}
        <br />
        <br />
        <div className="text-center eversion-copy">
          <span>&copy; eversion {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
