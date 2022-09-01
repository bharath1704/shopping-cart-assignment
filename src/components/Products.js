import { useContext, useState, useEffect } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { alert } from 'react-custom-alert';

import useFetch from '../services/useFetch';
import Button from './UI/Button';
import constants from '../utils/constants';
import CartContext from '../store/CartContext';

import useWindowSize from '../services/useWindow';

import './Products.scss';

const Products = () => {

  const { categoryParam } = useParams();
  const { data: categoriesData, error: categoriesError } = useFetch(`${constants['categories']}`);
  const { data: productsData, error: productsError } = useFetch(`${constants['products']}`);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMobile, setMobile] = useState(false);

  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    setMobile(windowWidth < 513);
  }, [windowWidth]);

  const crtContext = useContext(CartContext);

  const buyHandler = (product) => {
    fetch(`${constants['baseUrl']}${constants['addToCart']}`,
      {
        method: 'POST',
        headers: constants['headers'],
        body: JSON.stringify(product)
      }).then(resp => resp.json())
      .then(res => {
        console.log(res);
        if (res.response === 'Success') {
          alert({ message: res.responseMessage, type: 'success' });
          crtContext.addItems({
            id: product.id,
            name: product.name,
            amount: 1,
            price: product.price,
            image: product.imageURL
          });
        }
        else {
          alert({ message: 'Unable to add the item to Cart', type: 'error' });
        }
      })
      .catch(err => alert({ message: 'Something went wrong', type: 'error' }))
  };

  const productType = categoryParam ? categoriesData?.find(categ => categ.id === categoryParam)?.name : 'Select Product Type';

  return (
    <main className='products-home'>
      <nav className='categories-section'>
        <button
          className="btn btn-full categ-type flex justify-space-bwn align-center"
          onClick={() => setMenuOpen(!isMenuOpen)}>
          <span>{productType}</span>
          <i className={`arrow ${isMenuOpen ? 'up' : 'down'}`}></i>
        </button>
        {(!isMobile || (isMobile && isMenuOpen)) && <ul className='category-menu'>
          {
            categoriesData.filter(categ => categ.order >= 0)
              .sort((a, b) => a.order - b.order)
              .map((category) => {
                return <li key={category.id}>
                  <NavLink to={`/products/${category.id}`}>{category.name}</NavLink>
                </li>
              })
          }
        </ul>}
      </nav>
      <section className="products-section grid">
        {productsData.filter(prod => categoryParam ? prod.category === categoryParam : true).map(product => {
          return (
            <div
              key={product.id}
              className="flex flex-dir-col product">
              <h1> {product.name} </h1>
              <div className="product-info">
                <img src={product.imageURL} alt={product.name} />
                <p title={product.description}>{product.description}</p>
              </div>
              <div className="flex justify-space-bwn price-section">
                <span>MRP Rs.{product.price}</span>
                <Button title="Buy Now" clickHandler={() => buyHandler(product)} />
              </div>
              <div className="tab-price-section">
                <Button
                  fullWidth
                  title={`Buy Now @ ${product.price}`}
                  clickHandler={() => buyHandler(product)}
                />
              </div>
            </div>
          )
        }
        )}
      </section>

    </main>

  )
}

export default Products;