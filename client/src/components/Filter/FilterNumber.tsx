import React, { useEffect, useState } from 'react';
import './index.css';
import InputText from '../Input/InputText';

interface FilterNumberProps {
	getInterval: (v1: number, v2: number) => void;
}

function FilterNumber({ getInterval }: FilterNumberProps) {
	const [value1, setValue1] = useState("");
	const [value2, setValue2] = useState("");

	useEffect(() => {
		if (value1 && value2) {
			getInterval(Number(value1), Number(value2))
		} else {
			getInterval(0, Infinity)
		}
	}, [value1, value2])

	return (
		<div className='filter-container'>
			<span>Фильтрация по номеру заявки: </span>
			<div className='filter-inputs-container'>
				<InputText name='filter-requestNumber-from'
				           placeholder='От'
				           style={{width: 100}}
				           onChange={(v) => setValue1(v)} />
				—
				<InputText name='filter-requestNumber-to'
				           placeholder='До'
				           style={{width: 100}}
				           onChange={(v) => setValue2(v)} />
			</div>
		</div>
	)
}

export default FilterNumber