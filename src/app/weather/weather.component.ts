import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from "../service/apiservice.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherForm: FormGroup;
  temperature: any;
  description: any;
  location: any;
  state: any;
  country: any;
  weatherIcon: any;
  weatherFound = false;

  loading = false;
  localTime: any;
  message;
  messageClass;
  shoMessage: boolean;

  constructor(private fb: FormBuilder, private service: ApiserviceService) { }

  ngOnInit() {

    this.weatherForm = this.fb.group({
      location: ['', Validators.required]
    });
  }

  searchWeather(e) {
    this.loading = true;
    // console.log(e.location.value);
    this.service.getWeatherDetails(e.location).subscribe(res => {
      console.log(res);


      if (res.success == false) {
        this.weatherFound= false;
        this.shoMessage= true;
        this.messageClass = 'alert alert-danger';
        this.message =res.error.info;
        this.loading = false;
        this.weatherForm.reset();
      }
      else {
        this.temperature = res.current.temperature;
        this.description = res.current.weather_descriptions;
        this.location = res.location.name;
        this.state = res.location.region;
        this.country = res.location.country;
        this.localTime = res.location.localtime;
        this.weatherIcon = res.current.weather_icons;
        this.weatherFound = true;
        this.shoMessage= false;
        this.loading = false;
        this.weatherForm.reset();
      }
    });


  }

}
