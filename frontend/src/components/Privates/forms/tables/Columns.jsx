function Columns(datas) {
  if (!datas || typeof datas !== 'object') {
    throw new Error('Input must be a non-null object');
  }
    const columns = [];
    for (let data of Object.values(datas)) { 
      const accessorKey = data;
      const header = data.charAt(0).toUpperCase() + data.slice(1); // Capitalisation de la première lettre du header
      columns.push({
        accessorKey,
        header,
        cell: (props) => <p>{props.getValue()}</p>,
      });
    }
  
    return columns;
  }
  

  export default Columns;
  