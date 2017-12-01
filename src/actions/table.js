export const HANDLE_TABLE_CHANGE = 'HANDLE_TABLE_CHANGE';

export const handleTableChange = ({source, value}) => ({
  type: HANDLE_TABLE_CHANGE,
  source,
  value
});