'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOutAction } from './actions';

export default function AuthNav() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let active = true;
    fetch('/api/session', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : { user: null })
      .then((result) => { if (active) setUser(result.user || null); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);
  if (!loaded) return <><Link href="/signin">Sign in</Link><Link href="/signup">Sign up</Link></>;
  if (!user) return <><Link href="/signin">Sign in</Link><Link href="/signup">Sign up</Link></>;
  return <><Link href="/orders">My orders</Link>{user.role === 'kitchen' && <Link href="/kitchen">Kitchen</Link>}<form action={signOutAction}><button className="nav-button" type="submit">Sign out</button></form></>;
}
