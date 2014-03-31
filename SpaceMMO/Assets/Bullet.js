#pragma strict

var vel : Vector2;
var speed = 100;
var damage = 1.0;
var dead = false;
var madeByPlayer = false;
var shootLoc : Vector3;
var range = 50;
var showHitNotification = false;
var guiSkin1 : GUISkin;
var homing = false;
var deathTime = 500;
var curveLimit = .02;
var lifeTimer = 0;
var rightIsForward = true;

function Start ()
{
	
}

function Update ()
{
	if ((Vector3.Distance(transform.position, shootLoc) > range && !homing) || (lifeTimer > deathTime && homing))
		dead = true;
	if (!dead)
	{
		if (rightIsForward)
			rigidbody.velocity = transform.right.normalized * speed;
		else
			rigidbody.velocity = transform.forward.normalized * speed;
		if (homing)
		{
			lifeTimer ++;
			var vel = GameObject.Find("Player").transform.position - transform.position;
			vel = Vector3.ClampMagnitude(vel, curveLimit);
			if (rightIsForward)
				transform.right += vel;
			else
				transform.forward += vel;
		}
	}
	else
		rigidbody.velocity = Vector3.zero;
}

function OnTriggerEnter (other : Collider)
{
	if (madeByPlayer && other.gameObject.tag == "Enemy" && !dead)
	{
		other.gameObject.GetComponent(Enemy).enabled = true;
		other.gameObject.GetComponent(Enemy).hp -= damage;
		dead = true;
		NotifyHit ();
	}
	else if (!madeByPlayer && other.gameObject.name == "Player" && !dead)
	{
		other.gameObject.GetComponent(Player).hp -= damage;
		dead = true;
	}
	else if (other.gameObject.tag == "Collider" && !dead)
	{
		dead = true;
	}
}

function OnGUI ()
{
	GUI.skin = guiSkin1;
	if (showHitNotification)
		GUI.Label(Rect(Screen.width / 2 - 50, Screen.height / 2 - 125, 100, 100), "HIT!");
}

function NotifyHit ()
{
	showHitNotification = true;
	yield WaitForSeconds(.5);
	showHitNotification = false;
}