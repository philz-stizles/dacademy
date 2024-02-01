import { Separator } from '@/components/ui/separator';
import Aside from './components/settings-aside';

type Props = {
  children: React.ReactNode;
};

const SettingsLayout = ({ children }: Props) => {
  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <Aside />
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
