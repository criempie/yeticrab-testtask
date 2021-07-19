import React, { useEffect, useState } from 'react';
import './index.css';

interface SearchLineProps {
	onChange: (value: string) => void;
}

function SearchLine({ onChange }: SearchLineProps) {
	let timer =  setTimeout(() => {}, 0);

	return (
		<input className='searchLine'
				   type='text'
		       onChange={e => {
			       clearTimeout(timer);
			       timer = setTimeout(() => onChange(e.target.value.trim()), 100)
		       }}
				   placeholder='Поиск по имени' />
	)
}

export default SearchLine