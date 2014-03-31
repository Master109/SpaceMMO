#pragma strict

var speed = 25;
var hp = 100.0;
var go : GameObject;
var bullet : GameObject;
var shootTimer = 0;
var shootRate = 10;
var guiSkin1 : GUISkin;
var guiSkin2 : GUISkin;
var initCameraLoc : Vector3;
var canZoom = true;
var canZoom2 = false;
var hit : RaycastHit;
var showText = false;

function Start ()
{
	
}

function Update ()
{
	rigidbody.velocity = transform.right * Input.GetAxis("Vertical") * speed + (-transform.forward * Input.GetAxis("Horizontal") * speed) + (transform.up * Input.GetAxis("Z") * speed);
	if (Input.GetAxisRaw("Vertical") > 0)
	{
		transform.Find("Particle System").particleSystem.enableEmission = true;
	}
	else
	{
		transform.Find("Particle System").particleSystem.enableEmission = false;
	}
	if (hp <= 0)
		Application.LoadLevel(0);
	if (Physics.Raycast(Ray(transform.position, transform.right), hit, bullet.GetComponent(Bullet).range))
	{
		GetComponent(LineRenderer).SetPosition(1, Vector3(Vector3.Distance(transform.position, hit.point), 0, 0));
		if (hit.transform.gameObject.tag == "Enemy")
			showText = true;
		else
			showText = false;
	}
	else
	{
		showText = false;
		GetComponent(LineRenderer).SetPosition(1, Vector3(bullet.GetComponent(Bullet).range, 0, 0));
	}
	/*
	if (Input.GetAxisRaw("Fire2") == 1 && canZoom)
	{
		initCameraLoc = transform.Find("Camera").localPosition;
		canZoom = false;
		canZoom2 = true;
	}
	else if (Input.GetAxisRaw("Fire2") == 0 && canZoom2)
	{
		canZoom = true;
		canZoom2 = false;
		transform.Find("Camera").localPosition = initCameraLoc;
		transform.Find("Camera").camera.fieldOfView = 60;
	}
	if (Input.GetAxisRaw("Fire2") == 1)
	{
		transform.Find("Camera").localPosition = transform.right * 10;
		transform.Find("Camera").camera.fieldOfView = 20;
	}
	*/
	shootTimer ++;
	if (shootTimer > shootRate && Input.GetAxisRaw("Fire1") == 1)
	{
		go = GameObject.Instantiate(bullet, transform.position, transform.rotation);
		go.GetComponent(Bullet).shootLoc = transform.position;
		go.GetComponent(Bullet).madeByPlayer = true;
		shootTimer = 0;
	}
}

function OnCollisionStay(collision : Collision)
{
	hp -= collision.relativeVelocity.magnitude / 2.5;
}

function OnGUI ()
{
	GUI.skin = guiSkin1;
	GUI.Label(Rect(0, 0, 99999, 99999), "HP: " + Mathf.RoundToInt(hp));
	GUI.skin = guiSkin2;
	if (showText)
		GUI.Label(Rect(Screen.width / 2 - 250, Screen.height / 2 - 100, 500, 100), "SHOOT!");
}