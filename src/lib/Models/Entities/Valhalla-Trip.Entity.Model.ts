
export interface ValhallaRoute {
  language: string;
  legs: ValhallaLeg[];
  locations: ValhallaLocation[];
  status: number;
  status_message: string;
  summery: ValhallaSummery;
  units: string;
}

interface ValhallaLocation {
  heading: 0;
  lat: number;
  lon: number;
  original_index: number;
  side_of_street: string;
  type: string;
}

interface ValhallaLeg {
  maneuvers: ValhallaManeuver[];
  shape: string;
  summary: ValhallaSummery;
}

interface ValhallaManeuver {
  begin_shape_index: number;
  cost: number;
  end_shape_index: number;
  instruction: string;
  length: number;
  time: number;
  travel_mode: string;
  travel_type: string;
  type: number;
  verbal_post_transition_instruction: string;
  verbal_pre_transition_instruction: string;
  verbal_succinct_transition_instruction: string;
}

interface ValhallaSummery {
  cost: number;
  has_ferry: boolean;
  has_highway: boolean;
  has_time_restrictions: boolean;
  has_toll: boolean;
  length: number;
  max_lat: number;
  max_lon: number;
  min_lat: number;
  min_lon: number;
  time: number;
}
