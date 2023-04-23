import { useState,useMemo } from 'react';
import './App.css';
import {v4 as uuidv4} from 'uuid'
import List from './Components/List';
import Alert from './Components/Alert';
import countryList from 'react-select-country-list'
import { Col, Row,DatePicker, Space, TimePicker } from 'antd';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Select from 'react-select'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


function App() {
  const [name,setname] = useState('')
  const [lastname,setLastname] =useState('')
  const [gender,setGender] = useState('')
  const [salary,setSalary] = useState('')

  const [list,setList] = useState([])
  const [alert,setAlert] = useState({show:false,msg:'',type:''})
  const [checkEditItem,setCheckEditItem] = useState(false)
  const [editId,setEditId] = useState(null)
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const submitData=(e)=>{
    e.preventDefault()
    if(!name){
        setAlert({show:true,msg:'กรุณาป้อนข้อมูล',type:'error'})
    }else if(checkEditItem && name){
        const result = list.map((item)=>{
          if(item.id===editId){
              return{...item,
                title :name,
                lastname:lastname,
               gender:gender,
               salary:salary,
              }
          }
          return item
        })
        setList(result)
        setname('')
        setCheckEditItem(false)
        setEditId(null)
        setAlert({show:true,msg:'แก้ไขข้อมูลเรียบร้อย',type:'success'})
    }else{
      const newItem ={
        id:uuidv4(),
        title :name,
        lastname:lastname,
        gender:gender,
        salary:salary,
      }
      console.log(newItem)
      setList([...list,newItem])
      setname('')
      setLastname('')
      setSalary('')
      setAlert({show:true,msg:'บันทึกข้อมูลเรียบร้อย',type:'success'})
    }
  }

  const removeItem=(id)=>{
    setList( list.filter((item)=>item.id !== id))
    setAlert({show:true,msg:'ลบข้อมูลเรียบร้อยแล้วครับ',type:'delete'})
  }
  const editItem=(id)=>{
    setEditId(id)
    setCheckEditItem(true)
    const searchItem = list.find((item)=>item.id === id )
    setname(searchItem.title)
    setLastname(searchItem.lastname)
      setSalary(searchItem.salary)
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const onValueChange=(event)=> {
    setGender({
      selectedOption: event.target.value
    });
  }
  const changeHandler = value => {
    setValue(value)}

    const onChange1 = (date, dateString) => {
      console.log(date, dateString);
    };
    dayjs.extend(customParseFormat);
    const onChange2 = (time, timeString) => {
  console.log(time, timeString);
};




  return (
    <section className='container'>

      <div>
        <h1>Swift Dynamic</h1>
        {alert.show && <Alert {...alert} setAlert={setAlert} list={list} /> }

        <form className='form-group' onSubmit={submitData}>
          <div className='form-control'>
          <Row>
      <Col span={2}><label>Time</label></Col>
      <Col span={4}> <TimePicker onChange={onChange2} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} /></Col>
      <Col span={2}><label>FirstName</label></Col>
      <Col span={6}><input type='text' className='textinput' onChange={(e)=>setname(e.target.value)} value={name} required ></input></Col>
      <Col span={2}><label>LirstName</label></Col>
      <Col span={6}><input type='text' className='textinput' onChange={(e)=>setLastname(e.target.value)} value={lastname} required></input></Col>
    </Row>
          </div> 

          <div className='form-control'>
          <Row>
      <Col span={2}><label>Birthday</label></Col>
      <Col span={4}><DatePicker onChange={onChange1} /> </Col>
      <Col span={2}><label>Nationality</label></Col>
      <Col span={5}><Select  options={options} value={value} onChange={changeHandler} />  </Col>
          </Row>
          </div> 
          
          <div className='form-control'>
          <Row>
      <Col span={2}><label>Citizen</label></Col>
      <Col span={2}><input type='text' className='textinput' ></input></Col>
      <Col span={1}><label>-</label></Col>
      <Col span={4}><input type='text' className='textinput' ></input></Col>
      <Col span={1}><label>-</label></Col>
      <Col span={2}><input type='text' className='textinput' ></input></Col>
      <Col span={1}><label>-</label></Col>
      <Col span={4}><input type='text' className='textinput' ></input></Col>
      <Col span={1}><label>-</label></Col>
      <Col span={2}><input type='text' className='textinput' ></input></Col>
          </Row>
          </div> 

          <div className='form-control'>

          <Row>
      <Col span={2}><label>Gender</label></Col>
      <Col span={3}>  <input type="radio" value="Male" name="gender" onChange={onValueChange} /> Male    </Col>
      <Col span={3}>  <input type="radio" value="Female" name="gender" onChange={onValueChange}/> Female    </Col>
      <Col span={3}>   <input type="radio" value="UniSex" name="gender" onChange={onValueChange}/> UniSex   </Col>
          </Row>
          </div> 

          <div className='form-control'>
          <Row>
      <Col span={2}><label>Mobbile Phone</label></Col>
      <Col span={2}><PhoneInput country={'th'}  /></Col>
          </Row>
          </div> 


          <div className='form-control'>
          <Row>
      <Col span={2}><label>Expected Salary</label></Col>
      <Col span={7}><input type='text' className='textinput' onChange={(e)=>setSalary(e.target.value)} value={salary} required></input></Col>
      <Col span={7}></Col>
      <Col span={8}><label><button type='submit' className='submit-btn'>{checkEditItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}</button></label></Col>
          </Row>
          </div> 

          

        </form>
        </div>

        <section className='List-container'>
          {list.map((data,index)=>{
              return <List key={index} {...data} removeItem={removeItem} editItem={editItem}/>
          })}
         
        </section>
    </section>
   
  );
}

export default App;
