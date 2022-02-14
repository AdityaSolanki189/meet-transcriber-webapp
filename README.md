# MeetScript 
A Web Application where you can record meetings into <b>Transcripts</b> and apply <b>Sentiment Analysis</b> to better Analyse the Meetings.

<details>
  <summary>Features of the Project</summary>
  <ul>
    <li>Signup, login and manage user profile</li>   
    <li> Authentication via Email and Phone Number</li> 
    <li>Create Groups and add members via Email Invitation</li> 
    <li>Each Group can make multiple meetings.</li> 
    <li>Get the Transcript on the Meeting’s page in Real-time</li> 
    <li>Save the Meeting’s Transcript for later use.</li> 
    <li>Applying Sentiment Analysis after the meeting is over for better analysis.</li> 
  </ul>
</details>

### Platform/Technology
ReactJs,
Firebse(Cloud Storage),
WebSpeech Api,
Heroku

Language: Javascript and python

## Project Phases:

### Phase 1 - Authentication

![image](https://user-images.githubusercontent.com/39861703/153816108-c7ce843f-c6bd-4315-b8c9-d11cd9503ce5.png)

<p> Users can log into their account using their email and password or they can make an account 
by signing up using email and password. </p>

### Phase 2 - Creating Groups

<p> Following the account creation, users can create a group with other users to schedule a 
meeting with them. </p>

![image](https://user-images.githubusercontent.com/39861703/153816595-1800f82f-d189-4bf8-9c74-f20a9d3e318b.png)

<p>
  A meeting link validation has been set-up in order to verify the authenticity of the given link. 
If the meeting link is valid, users are asked the email ID of members of the meeting, group 
name and meeting name. Finally, users can click on the create button and create the group! 
Groups can be viewed under the “groups” section as follows.</p>

![image](https://user-images.githubusercontent.com/39861703/153816818-169ac3bd-8dbb-452e-8510-ebfac3f5c5ad.png)


### Phase 3 - Creating Meetings

![image](https://user-images.githubusercontent.com/39861703/153816936-87b8fb76-4b05-4774-b2fd-e5fc3dce0990.png)

<p> After a group has been created, user can create a meeting room with the group members 
with unique meeting IDs. </p>

![image](https://user-images.githubusercontent.com/39861703/153816970-906fc6b9-a08a-4cff-87cd-f8e58bf67b2b.png)

### Phase 4 - Transcription

<p>If the meeting is for the first time, users can click the record button and start recording the 
meeting. Their audio will be converted into texts and will appear on everyone’s screen in 
real-time. 
After the meeting is completed, the user who created the group can stop recording the 
meeting. Later, they can access the entire transcript of the meeting whenever they want.
</p>

![image](https://user-images.githubusercontent.com/39861703/153817095-fea72fe7-fadc-4dd6-a5db-b3a65d7716ac.png)

### Phase 5 - Sentiment Analysis

<p>When the meeting is stopped there appears a “Perform Sentiment Analysis” button, which 
when clicked will run sentiment analysis on each of the statements said by all the members 
of the meeting. The results are as follows: Red for a Negative Statement; Green for a 
Positive Statement; and Black for a Neutral Statement.
</p>

![image](https://user-images.githubusercontent.com/39861703/153817206-fa09a96c-0831-49a5-b592-62be9040bfc6.png)
