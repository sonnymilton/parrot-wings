import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    ShowButton,
    SimpleShowLayout,
    Show,
    NumberField,
    Create,
    SimpleForm,
    NumberInput,
    ReferenceInput,
    AutocompleteInput,
    required,
    minValue,
    useNotify
} from 'react-admin';

export const TransactionList = (props) => (
    <List {...props} sort={{field: 'createdAt', order: 'DESC'}}>
        <Datagrid>
            <TextField source="id"/>
            <DateField source="createdAt" showTime/>
            <TextField source="from.displayName" label="From" sortable={false}/>
            <TextField source="to.displayName" label="To" sortable={false}/>
            <NumberField source="amount"/>
            <ShowButton/>
        </Datagrid>
    </List>
);

export const TransactionShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <DateField source="createdAt" showTime/>
            <TextField source="from.displayName" label="From"/>
            <TextField source="to.displayName" label="To"/>
            <NumberField source="amount"/>
        </SimpleShowLayout>
    </Show>
);

const validateAmount = [
    required(),
    minValue(1)
];


export const TransactionCreate = (props) => {
    const notify = useNotify();

    const onFailure = (err) => {
        notify(err.body.errors.map(error => error.text).join(), 'error');
    }

    return (<Create onFailure={onFailure} {...props}>
        <SimpleForm>
            <NumberInput min={0} validate={validateAmount} source="amount"/>
            <ReferenceInput validate={required()} source="recipientId" reference="user">
                <AutocompleteInput optionText="account.displayName"/>
            </ReferenceInput>
        </SimpleForm>
    </Create>)
};