import { useNavigate } from "react-router-dom";

import useFetch from '../services/useFetch';
import Button from './UI/Button';
import constants from '../utils/constants';
import Carousel from './UI/Carousel';
import './Home.scss';

const Home = () => {
  const navigate = useNavigate();
  const { data, error } = useFetch(`${constants['categories']}`);
  const { data: bannersData } = useFetch(`${constants['banners']}`);

  return (
    <main className='home'>
      <section className='banners'>
        <Carousel data={bannersData} />
      </section>
      <section className='categories'>
        {!error ? data.filter(categ => categ.order >= 0)
          .sort((a, b) => a.order - b.order)
          .map(category => {
            return (
              <div className="category" key={category.id}>
                <div>{category.order % 2 !== 0 && <img alt={category.name} src={category.imageUrl} />}</div>
                <div className='flex flex-dir-col gap-1 text-center'>
                  <h1 className='category-name'>{category.name}</h1>
                  <p className='category-desc'>{category.description}</p>
                  <div>
                    <Button
                      title={`Explore ${category.key}`}
                      clickHandler={() => navigate(`/products/${category.id}`, { replace: true })} />
                  </div>
                </div>
                <div>{category.order % 2 === 0 && <img alt="" src={category.imageUrl} height="200" />}</div>
              </div>
            )
          }) : <h1>Something went wrong</h1>}
      </section>
    </main>
  )
}

export default Home;