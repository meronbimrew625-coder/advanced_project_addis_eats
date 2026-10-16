import { getDishes } from '../../lib/dishes';
import SearchMenu from './SearchMenu';
export const metadata = { title: 'Menu', description: 'Browse Ethiopian dishes, coffee and favorites at Addis Eats.' };
export default async function MenuPage() { const dishes = await getDishes(); return <section className="page-wrap"><p className="eyebrow">Made with tradition</p><h1>Our menu</h1><p className="intro">Explore the flavors you love. Search updates after you pause typing.</p><SearchMenu initialDishes={dishes} /></section>; }
