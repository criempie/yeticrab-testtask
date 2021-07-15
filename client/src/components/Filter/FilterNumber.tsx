import React from 'react';
import './index.css';

function FilterNumber() {

	return (
		<div className='filter-container'>
			<span>Фильтрация по номеру заявки: </span>
			<input className='filter-number-input' placeholder='От' />
			---
			<input className='filter-number-input' placeholder='До' />
		</div>
	)
}

export default FilterNumber