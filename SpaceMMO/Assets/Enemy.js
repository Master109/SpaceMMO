#pragma strict

var speed = 10;
var hp = 100.0;
var attackRange = 50;
var go : GameObject;
var bullet : GameObject;
var shootTimer = 0;
var shootRate = 10;
var rightIsForward = true;
var dir : Vector3;
var runOnce = true;
var vel : Vector3;
var pLoc : Vector3;
var changeDirectionTimer = 0;
var changeDirectionRateMin = 5;
var changeDirectionRateMax = 25;
var changeDirectionAmount = 1;
var orbitSpeed = .25;

function Start ()
{
	if (bullet.GetComponent(Bullet).homing && attackRange == -1)
		attackRange = bullet.GetComponent(Bullet).deathTime * (bullet.GetComponent(Bullet).speed / 10) / 2;
	vel = GameObject.Find("Player").transform.position - transform.position;
}

function Update ()
{
	shootTimer ++;
	if (Vector3.Distance(transform.position, GameObject.Find("Player").transform.position) > attackRange)
	{
		vel = GameObject.Find("Player").transform.position - transform.position;
		rigidbody.velocity = vel.normalized * speed;
		runOnce = true;
	}
	else
	{
		vel = GameObject.Find("Player").transform.position - transform.position;
		if (runOnce)
		{
			changeDirectionTimer = Random.Range(changeDirectionRateMin, changeDirectionRateMax);
			dir = Vector3(Random.Range(-1, 1), Random.Range(-1, 1), Random.Range(-1, 1));
			runOnce = false;
		}
		changeDirectionTimer --;
		if (changeDirectionTimer == 0)
		{
			changeDirectionTimer = Random.Range(changeDirectionRateMin, changeDirectionRateMax);
			var r = Mathf.RoundToInt(Random.Range(1, 3));
			if (r == 1)
				dir.x += Random.Range(-changeDirectionAmount, changeDirectionAmount);
			else if (r == 2)
				dir.y += Random.Range(-changeDirectionAmount, changeDirectionAmount);
			else if (r == 3)
				dir.z += Random.Range(-changeDirectionAmount, changeDirectionAmount);
		}
		pLoc = transform.position;
		var circumference = Vector3.Distance(transform.position, GameObject.Find("Player").transform.position) * Mathf.PI;
		var radius = Vector3.Distance(transform.position, GameObject.Find("Player").transform.position);
		transform.RotateAround(GameObject.Find("Player").transform.position, dir, circumference / (circumference * (speed / 10)) * orbitSpeed);
		//if (rightIsForward)
		//	transform.rotation = Quaternion.LookRotation(transform.right, transform.up);
		//else
		//	transform.rotation = Quaternion.LookRotation(transform.up, transform.right);
		if (shootTimer > shootRate)
		{
		go = GameObject.Instantiate(bullet, transform.position, transform.rotation);
		go.GetComponent(Bullet).shootLoc = transform.position;
		go.GetComponent(Bullet).range = attackRange;
		if (!rightIsForward)
			go.GetComponent(Bullet).rightIsForward = false;
		shootTimer = 0;
		}
	}
	if (rightIsForward)
		transform.right = vel;
	else
		transform.forward = vel;
	if (hp <= 0)
		Destroy(gameObject);
}

function OnCollisionStay(collision : Collision)
{
	hp -= collision.relativeVelocity.magnitude / 2.5;
}