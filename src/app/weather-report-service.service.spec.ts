import { TestBed } from '@angular/core/testing';

import { WeatherReportServiceService } from './weather-report-service.service';

describe('WeatherReportServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherReportServiceService = TestBed.get(WeatherReportServiceService);
    expect(service).toBeTruthy();
  });
});
