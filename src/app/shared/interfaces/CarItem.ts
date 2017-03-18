/**
 * Created by rostapetr on 27.02.17.
 */
interface CarItem {
  id: number;
  type: string;
  vin: string;
  carState: string;
  dateOfAcquisition: number;
  dateOfLastTechnicalCheck: number;
  price: number;
  nickname?: string;
}
