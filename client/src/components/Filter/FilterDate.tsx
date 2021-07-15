import React from 'react';
import './index.css';

function FilterNumber() {

	return (
		<div className='filter-container'>
			<span>Фильтрация по дате получения: </span>
			<input type='date' className='filter-date-input' placeholder='От' />
			---
			<input type='date' className='filter-date-input' placeholder='До' />
		</div>
	)
}

export default FilterNumber