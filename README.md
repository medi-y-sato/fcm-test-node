# fcm-test-node
Firebase Cloud Messagingをnodeで叩くテスト


```sh
curl --header "Authorization: key=<<server key>>" --header "Content-Type: application/json" https://fcm.googleapis.com/fcm/send -d "{\"registration_ids\":[\"<<registration id>>\"]}"
```
