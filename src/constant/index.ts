import {
  CloudHail,
  Sunrise,
  Sunset,
  Sun,
  Wind,
  Eye,
  Thermometer,
  Droplets,
} from "lucide-react";

export const weatherCards = [
    {
        icon: CloudHail,
        label: "Humidity",
        percentage: 60,
        unit: "%"
    },
    {
        icon: Sun,
        label: "UV Index",
        percentage: 5,
        unit: ""
    },
    {
        icon: Wind,
        label: "Wind Speed",
        percentage: 12,
        unit: "km/h"
    },
    {
        icon: Eye,
        label: "Visibility",
        percentage: 8,
        unit: "km"
    },
];

// Weather summary data structure
export const weatherSummary = {
  temperature: {
    current: 13,
    unit: "°C"
  },
  rainfall: {
    current: 2.5,
    unit: "mm"
  }
};