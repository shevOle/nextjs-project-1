import Header from '@/components/header';
import { User } from '@/lib/types';

export default function Home(props: { user: User | null }) {
  const { user } = props;
  return (
    <>
      <Header user={user} />
      <div className='flex flex-col justify-center text-center mx-auto mt-10 p-10 font-bold'>
        <p>Welcome to Scratch My Map.</p>
        <p>Please, authenticate to access all features.</p>
      </div>
    </>
  );
}
