import { Button } from '@/components/ui/button';
import { IconButton, Logo, SearchInput } from '@/components/ui/custom';
import { UserNav } from '@/components/ui/custom';
import { Bell, LogOut, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  const isTeacherPage = router.pathname?.startsWith('/instructor');
  const isCoursePage = router.pathname?.includes('/courses');
  const isSearchPage = router.pathname === '/search';
  const isTeacher = true;

  return (
    <div className="h-[60px] fixed inset-y-0 w-full z-50 p-4 border-b flex items-center bg-white shadow-sm">
      {/* <MobileSidebar /> */}
      <Logo />
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex items-center gap-x-2 ml-auto">
        {/* {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null} */}
        {/* <IconButton icon={<Bell />} />
        <ShoppingBag /> */}
        <UserNav />
      </div>
    </div>
  );
};

export default Navbar;
