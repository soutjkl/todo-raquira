import axios from "axios";
import { Chart } from 'primereact/chart';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Carousel } from 'primereact/carousel';
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
const UserList = () => {
  const [listUsers, setlistUser] = useState([]);
  const [listworkshop, setlistworkshop] = useState([]);

  const [usersData, setUsersData] = useState({});
  const [workshopStatusData, setWorkshopStatusData] = useState({});
  const [workshopMonthData, setWotkshopMonthData] = useState({});
  const [workshopCapacityData, setWorkshopCapacityData] = useState({});

  const [chartOptions, setChartOptions] = useState({});
  const [userType, setUserType] = useState([]);
  const [workshopStatus, setWorkshopStatus] = useState([]);
  const [workshopMonths, setWorkshopsMonths] = useState([]);
  const [workshopCapacity, setWorkshopCapacity] = useState([]);


  const URI = "http://localhost:8000/userAll";
  const URI_WORKSHOP = "http://localhost:8000/AllWorkshops";

  const dispatch = useDispatch();
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getlistworkshop();
  }, []);


  useEffect(() => {
    var generalUsers = 0;
    var adminUsers = 0;
    for (var i = 0; i < listUsers.length; i++) {
      if (listUsers[i].user_rol === 'Usuario General') {
        generalUsers++;
      } else if (listUsers[i].user_rol === 'Administrador') {
        adminUsers++;
      }
    }


    var availableWorkshop = 0;
    var notAvailableWorkshop = 0;
    for (var j = 0; j < listworkshop.length; j++) {
      if (listworkshop[j].status_workshop === 'N') {
        availableWorkshop++;
      } else if (listworkshop[j].status_workshop === 'D') {
        notAvailableWorkshop++;
      }
    }

    var workshopCountByMonth = {};
    for (var k = 0; k < listworkshop.length; k++) {
      var date = new Date(listworkshop[k].date_workshop);
      var monthYearKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      workshopCountByMonth[monthYearKey] = (workshopCountByMonth[monthYearKey] || 0) + 1;
    }

    var months = Object.keys(workshopCountByMonth);
    var workshopCounts = Object.values(workshopCountByMonth);


    console.log(listworkshop)
    
    var firstRange = 0;
    var secondRange = 0;
    var thirdRange = 0;
    for (var l = 0; l < listworkshop.length; l++) {
      if (listworkshop[l].capacity_workshop > 0 && listworkshop[l].capacity_workshop <=10 ) {
        firstRange++;
      } else if (listworkshop[l].capacity_workshop > 10 && listworkshop[l].capacity_workshop <=20) {
        secondRange++;
      }else if (listworkshop[l].capacity_workshop > 20 ) {
        thirdRange++;
      }
    }

    
    const workshopsByCapacity = {
      labels: ["1-10","11-20","Más de 20"],
      datasets: [
        {
          label: 'Cantidad de talleres',
          data: [firstRange,secondRange,thirdRange],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }
      ]
    };

    const workshopsByMonths = {
      labels: months,
      datasets: [
        {
          label: 'Cantidad de talleres',
          data: workshopCounts,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }
      ]
    };


    const usersByType = {
      labels: ['Administrador', 'Usuario General'],
      datasets: [
        {
          label: 'Cantidad de Usuarios',
          data: [adminUsers, generalUsers],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)'
          ],
          borderWidth: 1
        }
      ]
    };

    const workshopsByStatus = {
      labels: ['Disponible', 'No Disponible'],
      datasets: [
        {
          label: 'Cantidad de Talleres',
          data: [availableWorkshop, notAvailableWorkshop],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)'
          ],
          borderWidth: 1
        }
      ]
    };


    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    setUsersData(usersByType)
    setWorkshopStatusData(workshopsByStatus);
    setWotkshopMonthData(workshopsByMonths);
    setWorkshopCapacityData(workshopsByCapacity);

    const userByType = [
      { id: 1, label: 'Gráfico de barras', chart: <div style={{ margin: '0 auto', width: '500px' }}><Chart type="bar" data={usersData} options={chartOptions} /></div> },
      { id: 2, label: 'Gráfico de pastel', chart: <div style={{ margin: '0 auto', width: '260px' }}><Chart type="pie" data={usersData}  className="w-full md:w-30rem" /></div> },
      { id: 3, label: 'Gráfico de dona', chart: <div style={{ margin: '0 auto', width: '260px' }}><Chart type="doughnut" data={usersData} className="w-full md:w-30rem" /></div> }
    ];

    const workshopByType = [
      { id: 1, label: 'Gráfico de barras', chart: <div style={{ margin: '0 auto', width: '500px' }}><Chart type="bar" data={workshopStatusData} options={chartOptions} /></div> },
      { id: 2, label: 'Gráfico de pastel', chart: <div style={{ margin: '0 auto', width: '260px' }}><Chart type="pie" data={workshopStatusData}  className="w-full md:w-30rem" /></div> },
      { id: 3, label: 'Gráfico de dona', chart: <div style={{ margin: '0 auto', width: '260px' }}><Chart type="doughnut" data={workshopStatusData} className="w-full md:w-30rem" /></div> }
    ];

    const workshopByMonths = [
      { id: 1, label: 'Gráfico de barras', chart: <div style={{ margin: '0 auto', width: '500px' }}><Chart type="bar" data={workshopMonthData} options={chartOptions} /></div> },
      { id: 2, label: 'Gráfico de pastel', chart: <div style={{ margin: '0 auto', width: '260px' }}><Chart type="pie" data={workshopMonthData}  className="w-full md:w-30rem" /></div> },
      { id: 3, label: 'Gráfico de dona', chart: <div style={{ margin: '0 auto', width: '260px' }}><Chart type="doughnut" data={workshopMonthData} className="w-full md:w-30rem" /></div> }
    ];

    const workshopByCapacity = [
      { id: 1, label: 'Gráfico de barras', chart: <div style={{ margin: '0 auto', width: '500px' }}><Chart type="bar" data={workshopCapacityData} options={chartOptions} /></div> },
      { id: 2, label: 'Gráfico de pastel', chart: <div style={{ margin: '0 auto', width: '260px' }}><Chart type="pie" data={workshopCapacityData}  className="w-full md:w-30rem" /></div> },
      { id: 3, label: 'Gráfico de dona', chart: <div style={{ margin: '0 auto', width: '260px' }}><Chart type="doughnut" data={workshopCapacityData}  className="w-full md:w-30rem" /></div> }
    ];


    setUserType(userByType);
    setWorkshopStatus(workshopByType);
    setWorkshopsMonths(workshopByMonths);
    setWorkshopCapacity(workshopByCapacity);

    setChartOptions(options);

  }, [listUsers, listworkshop, dispatch]);

  const getUser = async () => {
    try {
      await axios.get(URI).then(function (res) {
        dispatch(setlistUser(res.data));
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
  const getlistworkshop = async () => {
    try {
      await axios.get(URI_WORKSHOP).then(function (res) {
        dispatch(setlistworkshop(res.data));
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
  const productTemplate = (product) => {
    return (
      <div>
        <h6 className="my-1" style={{ textAlign: "center" }}>
          {product.label}
        </h6>
        {product.chart}
      </div>
    );
  };

  return (
    <Splitter style={{ width: '100%', height: '100vh'}}>
      <SplitterPanel style={{width: "100px" }}>
        <Splitter layout="vertical">
          <SplitterPanel>
            <Splitter><div className="card flex justify-content-center">
              <h4 className="my-1" style={{ textAlign: "center" }}>
                Reporte por tipo de usuario
              </h4>
              <div className="card flex justify-content-center" style={{ border: '1px solid transparent' }}>
                <Carousel style={{ border: '1px solid transparent' }} value={userType} numVisible={1} numScroll={1} orientation="vertical" verticalViewPortHeight="300px"
                  itemTemplate={productTemplate} />
              </div>

            </div>
            </Splitter>

          </SplitterPanel>
          <SplitterPanel>
            <Splitter><div className="card flex justify-content-center">
              <h4 className="my-1" style={{ textAlign: "center" }}>
                Reporte por estado de talleres
              </h4>
              <div className="card flex justify-content-center" style={{ border: '1px solid transparent' }}>
                <Carousel style={{ border: '1px solid transparent' }} value={workshopStatus} numVisible={1} numScroll={1} orientation="vertical" verticalViewPortHeight="300px"
                  itemTemplate={productTemplate} />
              </div>

            </div>
            </Splitter>
          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
      <SplitterPanel style={{  width: "100px" }}>
        <Splitter layout="vertical">
          <SplitterPanel >
            <Splitter><div className="card flex justify-content-center">
              <h4 className="my-1" style={{ textAlign: "center" }}>
                Reporte de talleres por meses
              </h4>
              <div className="card flex justify-content-center" style={{ border: '1px solid transparent' }}>
                <Carousel style={{ border: '1px solid transparent' }} value={workshopMonths} numVisible={1} numScroll={1} orientation="vertical" verticalViewPortHeight="300px"
                  itemTemplate={productTemplate} />
              </div>

            </div>
            </Splitter>
          </SplitterPanel>
          <SplitterPanel >
          <Splitter><div className="card flex justify-content-center">
              <h4 className="my-1" style={{ textAlign: "center" }}>
                Reporte de talleres por capacidad
              </h4>
              <div className="card flex justify-content-center" style={{ border: '1px solid transparent' }}>
                <Carousel style={{ border: '1px solid transparent' }} value={workshopCapacity} numVisible={1} numScroll={1} orientation="vertical" verticalViewPortHeight="300px"
                  itemTemplate={productTemplate} />
              </div>

            </div>
            </Splitter>          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
    </Splitter>
  )
};

export default UserList;

