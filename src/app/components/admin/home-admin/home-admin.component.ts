import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexTitleSubtitle,
  ApexFill,
} from 'ng-apexcharts';

import { EChartsOption } from 'echarts';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import {MedicamentRestService} from 'src/app/services/medicamentRest/medicament-rest.service'
import { DoctorRestService } from 'src/app/services/doctorRest/doctor-rest.service';
import { AppointmentRestService } from 'src/app/services/appointmentRest/appointment-rest.service';

export type SparklineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  colors: string[];
  labels: string[] | number[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
};


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.sass']
})
export class HomeAdminComponent implements OnInit
{

  users: any;
  totalAppo: any;
  totalDoctors: any;
  totalPatients: any;
  totalMedicaments: any;
  totalSells: any;
  medicaments: any;
  doctors: any;
  appointments: any;

  ngOnInit(): void
  {

    this.getUsers();
    this.getDoctors();
    this.getMedicaments();
    this.getAppoiments();
    this.getUsersAndDoctors();
  }

  getAppoiments(){
    this.appoimentsRest.getAppointments().subscribe({
      next:(res: any)=>{
        this.appointments = res.appointmentsExist
        this.totalAppo = this.appointments.length
      }
    })
  }

  getUsers()
  {
    this.userRest.getUsers().subscribe({
      next: (res: any) =>
      {
        this.users = res.users
        this.totalPatients = this.users.length;
      },
      error: (err) => console.log(err)
    })
  }

  getUsersAndDoctors()
  {
    this.userRest.getUsersAndDoctors().subscribe({
      next: (res: any) =>
      {
        this.donut_chart = {
          tooltip:
          {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend:
          {
            show: true,
            data: ['DOCTORES', 'PACIENTES'],
            textStyle:
            {
              color: '#9aa0ac',
              padding: [5, 10],
            },
          },
          toolbox:
          {
            show: true,
          },
          series:
          [
            {
              name: 'Role',
              type: 'pie',
              radius: ['40%', '70%'],
              itemStyle: {
                borderRadius: 0,
                borderColor: '#fff',
                borderWidth: 2,
              },
              data:[],
            },
          ],
          color: ['#FFC107', '#0D6EFD'],
        };
        this.donut_chart.series[0].data = res.array
      },
      error: (err) => console.log(err)
    })
  }

  getDoctors(){
    this.doctorRest.getDoctors().subscribe({
      next: (res: any)=>{
        this.doctors = res.doctors
        this.totalDoctors = res.doctors.length

      },
      error: (err)=>console.log(err)
    })
  }

  getMedicaments()
  {
    this.medicamentRest.getMedicaments().subscribe({
      next: (res: any) =>
      {
        this.medicaments = res.medicaments
        this.totalMedicaments = this.medicaments.length;
        this.totalSells = this.medicaments.sell.length;
      },
      error: (err) => console.log(err)
    })
  }


  donut_chart: EChartsOption

  @ViewChild('chart') chart: ChartComponent;

  // sparkline chart start
  public commonBarSparklineOptions: Partial<SparklineChartOptions> = {
    chart: {
      type: 'bar',
      width: 100,
      height: 25,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
      },
    },
    series: [
      {
        name: 'income',
        data: [31, 40, 28, 44, 60, 55, 68, 51, 42, 85, 77],
      },
    ],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {},
      marker: {
        show: false,
      },
    },
  };

  // donut chart end
  // area chart start
  public areaChartOptions: Partial<areaChartOptions> = {
    series: [
      {
        name: 'Cuantity medicaments',
        data: [31, 40, 28, 51, 42, 85, 77],
      },
      {
        name: 'Total Sells',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
      height: 380,
      type: 'area',
      toolbar: {
        show: false,
      },
      foreColor: '#9aa0ac',
    },
    colors: ['#9F8DF1', '#E79A3B'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z',
      ],
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      offsetX: 0,
      offsetY: 0,
    },

    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  constructor
  (
    private medicamentRest: MedicamentRestService,
    private userRest: UserRestService,
    private doctorRest: DoctorRestService,
    private appoimentsRest: AppointmentRestService
  )
  {

  }


}
