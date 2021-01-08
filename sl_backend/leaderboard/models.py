from django.db import models


class StudentDetails(models.Model):
    """Model definition for StudentDetails."""

    name = models.CharField(max_length=50)
    rollno = models.CharField(max_length=10, primary_key=True, unique=True, null=False)
    math_marks = models.IntegerField()
    physics_marks = models.IntegerField()
    chemistry_marks = models.IntegerField()
    total = models.IntegerField()
    percentage = models.FloatField()

    class Meta:
        """Meta definition for StudentDetails."""

        verbose_name = "StudentDetails"
        verbose_name_plural = "StudentDetailss"

    def __str__(self):
        """Unicode representation of StudentDetails."""
        return f"{self.name}|{self.percentage}"
