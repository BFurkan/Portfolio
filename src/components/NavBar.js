import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Resume' },
  { to: '/projects', label: 'Projects' },
  { to: '/upslash', label: 'Upslash' },
];

function NavBar() {
  return (
    <nav className="bg-slate-900/95 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Furkan Bayar
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-4 text-sm font-medium text-slate-200 md:gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                [
                  'transition-colors duration-200 hover:text-amber-400',
                  isActive ? 'text-amber-400' : 'text-slate-200',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
