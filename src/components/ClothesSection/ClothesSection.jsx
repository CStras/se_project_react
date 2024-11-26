import './ClothesSection.css';
import { defaultClothingItems } from '../../utils/constants';
import ItemCard from '../ItemCard/ItemCard';

function ClothesSection({handleCardClick}) {
    return (
        <div className="clothes-section">
            <div className="clothes-section__title-button">
                <p className='clothes-section__title'>Your items</p>
                <button className='clothes-section__button'>+ Add new</button>
            </div>
                <ul className="clothes-section__items">
                        {defaultClothingItems
                            .map((item) => {
                                return <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
                            })}
                </ul>
        </div>
    );
}

export default ClothesSection;