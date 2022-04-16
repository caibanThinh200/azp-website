import { Checkbox, Input, Radio, Select, Space } from "antd";
import clsx from "clsx";
import { Fragment } from "react";

const RadioFilterType = props => {
    const onRadioChange = e => {
        const filterParams = {
            name: e.target.name,
            value: e.target.value
        }
        return props.onFilterChange(filterParams);
    }

    return <Radio.Group {...props} onChange={onRadioChange}>
        <Space direction="vertical">
            {
                (props.dataFilter || []).length > 0 && (props.dataFilter || []).map(filter =>
                    <Radio value={filter}>{filter}</Radio>)
            }
        </Space>
    </Radio.Group>
}

const CheckboxFilterType = props => {
    const onCheckboxChange = value => {
        const filterParams = {
            name: props.name,
            value
        }
        return props.onFilterChange(filterParams);
    }

    const options = (props.dataFilter || []).map(filter => ({ label: filter, value: filter }));
    
    return <Space direction="vertical">
        <Checkbox.Group {...props}
            options={options}
            onChange={onCheckboxChange}
        >
        </Checkbox.Group>
    </Space>
}

const SelectFilterType = props => {
    const onSelectChange = (e) => {
        const filterParams = {
            name: props.name,
            value: e
        }
        return props.onFilterChange(filterParams)
    }

    const onSelectClear = (e) => {
        return props.onFilterChange({});
    }

    return <Select
        {...props}
        onClear={onSelectClear}
        onSelect={onSelectChange}
        className={clsx("w-100", props.className)}
    >
        {
            (props.dataFilter || []).length > 0 && (props.dataFilter || []).map(filter =>
                <Select.Option value={filter}>{filter}</Select.Option>)
        }
    </Select>
}

const InputFilterType = props => {
    const onInputChange = (value, name) => {
        const filterParams = {
            name: name,
            value: value
        }
        return props.onFilterChange(filterParams);
    }
    return <Input.Search {...props} onSearch={value => onInputChange(value, props.name)} />
}

const FilterOptions = props => {
    switch (props.type) {
        case 1: return <RadioFilterType {...props} />
        case 2: return <CheckboxFilterType {...props} />
        case 3: return <SelectFilterType {...props} />
        case 4: return <SelectFilterType {...props} multiple />
        case 5: return <InputFilterType {...props} />
        default: return ""
    }
}

export default FilterOptions;