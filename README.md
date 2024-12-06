# Tests des endpoints OCPP

## Test de Set Charging Profile

Endpoint : `POST /set_charging_profile/{charge_point_id}`

Exemple de payload :

{
"connector_id": 1,
"cs_charging_profiles": {
"chargingProfileId": 1,
"stackLevel": 0,
"chargingProfilePurpose": "TxDefaultProfile",
"chargingProfileKind": "Absolute",
"chargingSchedule": {
"duration": 86400,
"startSchedule": "2024-03-20T10:00:00Z",
"chargingRateUnit": "A",
"chargingSchedulePeriod": [
{"startPeriod": 0, "limit": 16.0}
]
}
}
}



## Test de Clear Charging Profile

Endpoint : `POST /clear_charging_profile/{charge_point_id}`

Exemple de payload :
json
{
"id": 42,
"connector_id": 1,
"charging_profile_purpose": "TxProfile",
"stack_level": 0
}
