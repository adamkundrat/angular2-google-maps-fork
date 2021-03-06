/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.13.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
import {Injectable} from '@angular/core';

@Injectable()
export abstract class MapsAPILoader {
  abstract load(): Promise<void>;
}
