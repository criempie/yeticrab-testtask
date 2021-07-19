import React, { useEffect, useState } from 'react';
import './index.css';

interface FilterDateProps {
	getInterval: (v1: string, v2: string) => void;
}

function FilterDate({ getInterval }: FilterDateProps) {
	const [value1, setValue1] = useState("");
	const [value2, setValue2] = useState("");

	useEffect(() => {
		if (value1 && value2) {
			getInterval(value1, value2);
		} else {
			getInterval("", "")
		}
	}, [value1, value2])

	return (
		<div className='filter-container'>
			<span>
				Фильтрация по дате получения:
				<img src='./icons/cancel.svg'
				     alt='cancel'
				     className='icon'
				     style={{width: 24, marginLeft: 5, visibility: (value1 || value2) ? "visible" : "hidden"}}
						 onClick={() => {setValue1(""); setValue2("")}} />
			</span>
			<input type='date'
			       className='filter-date-input'
			       placeholder='От'
			       value={value1}
			       onChange={(e) => setValue1(e.target.value)} />
			---
			<input type='date'
			       className='filter-date-input'
			       placeholder='До'
			       value={value2}
			       onChange={(e) => setValue2(e.target.value)}/>
		</div>
	)
}

export default FilterDate