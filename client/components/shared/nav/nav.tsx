import Link from 'next/link';

const Nav = () => {
  return (
    <nav className='flex-1'>
      <ul className='flex justify-center gap-6'>
        <li>
          <Link href={``}>Home</Link>
        </li>
        <li>
          <Link href={``}>Mentors</Link>
        </li>
        <li>
          <Link href={``}>About Us</Link>
        </li>
        <li>
          <Link href={``}>Resources</Link>
        </li>
        <li>
          <Link href={``}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
