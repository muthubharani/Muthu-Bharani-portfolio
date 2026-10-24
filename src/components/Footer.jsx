export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span>&copy; {year} Muthu Bharani P</span>
        <span className="footer__built">Built with React</span>
      </div>
    </footer>
  )
}
