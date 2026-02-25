import React from 'react'

export default function Footer() {
  return (
   <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover hover:text-blue-500">Branding</a>
    <a className="link link-hover hover:text-blue-500">Design</a>
    <a className="link link-hover hover:text-blue-500">Marketing</a>
    <a className="link link-hover hover:text-blue-500">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover hover:text-blue-500">About us</a>
    <a className="link link-hover hover:text-blue-500">Contact</a>
    <a className="link link-hover hover:text-blue-500">Jobs</a>
    <a className="link link-hover hover:text-blue-500">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover hover:text-blue-500">Terms of use</a>
    <a className="link link-hover hover:text-blue-500">Privacy policy</a>
    <a className="link link-hover hover:text-blue-500">Cookie policy</a>
  </nav>
</footer>
  )
}
